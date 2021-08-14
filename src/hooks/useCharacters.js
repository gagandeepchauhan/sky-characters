import {useState,useEffect} from 'react'
import api from '../api/badCharacters'

const NUM_OF_CHARACTERS=62
export function useCharacters() {
	const [characters,setCharacters]=useState([])
	const [error,setError]=useState(null)
	const [loading,setLoading]=useState(false)
	const [name,setName]=useState('')
	const [category,setCategory]=useState('')
	const [page,setPage]=useState(1)
	const [limit,setLimit]=useState(5)

	async function fetchCharacters(name,category){
		try{
			setError(null)
			setLoading(true)
			let offset=(page-1)*limit // note this is the offset i.e how many no. of records to skip , this is not the starting index of record
			const params={
					limit,
					offset,
					name,
					category:name ? '' : category
				}
			const result = await api.get('/characters',{
				params
			})
			let data=result.data
			console.log(result.data)
			if(name && category){
				data=data.sort((a,b)=>getRelevancy(category.toUpperCase(),b.category.toUpperCase())-getRelevancy(category.toUpperCase(),a.category.toUpperCase()))
			}
			setCharacters(data)
		}catch(err){
			setError(err.message)
		}
		setLoading(false)
	}
	function getRelevancy(value,category){
		if(value===category)
			return 3
		if(category.startsWith(value))
			return 2
		if(category.includes(value))
			return 1
		return 0
	}
	function handleQuery(e){
		e.preventDefault()
		fetchData(name,category)
	}
	function fetchNextPage(){
		if(page>=(Math.ceil(NUM_OF_CHARACTERS/limit))) return
		setPage(prev=>prev+1)	
	}
	function fetchPrevPage(){
		if(page<=1) return
		setPage(prev=>prev-1)
	}
	function notHasNext(){
		return loading || (page>=(Math.ceil(NUM_OF_CHARACTERS/limit))) || characters.length<limit 
	}
	function notHasPrev(){
		return loading || page<=1
	}
	function match(cat,nam){
		return cat.toUpperCase().includes(category.toUpperCase()) && nam.toUpperCase().includes(name.toUpperCase())
	}
	function refresh(){
		setName('')
		setCategory('')
		fetchData('','')
	}

	function fetchData(name,category){
		if(page===1)
			fetchCharacters(name,category)
		else
			setPage(1)
	}

	useEffect(()=>{
		console.log('page changed to',page)
		fetchCharacters(name,category)
	},[page])
	useEffect(()=>{
		console.log('limit changed to ',limit)
		fetchData(name,category)
	},[limit])

	return {
			characters,error,loading,
			name,setName,category,setCategory,
			page,limit,setLimit,handleQuery,
			notHasPrev,notHasNext,match,
			fetchPrevPage,fetchNextPage,refresh
		}
}