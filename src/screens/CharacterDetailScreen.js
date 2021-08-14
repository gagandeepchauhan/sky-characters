import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import api from '../api/badCharacters'
import QuoteItem from '../components/QuoteItem'

export default function CharacterDetailScreen(props) {
	const id=props.match.params.id
	const [data,setData]=useState(null)
	const [quotes,setQuotes]=useState([])
	const [error,setError]=useState(null)
	const [loading,setLoading]=useState(false)
	const history=useHistory()

	function goBack(){
		history.goBack()
	}

	async function fetchCharacter(){
		try{
			setError(null)
			setLoading(true)
			const result = await api.get(`/characters/${id}`)
			setData(result.data[0])
			console.log(result.data[0])
		}catch(err){
			setError(err.message)
		}
		setLoading(false)
	}
	async function fetchQuotes(){
		try{
			setError(null)
			setLoading(true)
			const result = await api.get(`/quote?author=${data.name}`)
			setQuotes(result.data)
			console.log(result.data)
		}catch(err){
			setError(err.message)
		}
		setLoading(false)
	}

	useEffect(()=>{
		fetchCharacter()
	},[])
	useEffect(()=>{
		if(data)
			fetchQuotes()
	},[data])

	return (
		<div className="character-detail" align="center">
			{loading && <div className="load">
				<div className="donutSpinner"></div>
			</div>}
			{error ? <div className="full-error">error : {error}</div> :
				<>
				{data && 
					<div className="details">
						<button onClick={goBack} className="back-btn" >back</button>
						<div className="head-details">
							<div className="profile-pic">
								<img src={data.img} alt="user profile picture" />
							</div>
							<div className="user-details">
								<h1>{data.name}</h1>
								{data.nickname && <h5><em>@ {data.nickname}</em></h5>}
								<br/>
								<p><strong>DOB : </strong>{data.birthday}</p>
								<p><strong>Status : </strong>{data.status}</p>
								<p><strong>Portrayed by : </strong>{data.portrayed}</p>
								<p><strong>Seasons : </strong>{data.appearance?.join(" || ")}</p>
								<p><strong>Occupation : </strong>{data.occupation?.join(" || ")}</p>
							</div>
						</div>

						<div className="quotes">
							<h1>Quotes ({quotes.length})</h1>
							{quotes.map(item=>(
								<QuoteItem data={item} />
							))}
						</div>
					</div>
				}
				</>
			}
		</div>
	)
}