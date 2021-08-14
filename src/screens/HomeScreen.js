import React from 'react'

import {useCharacters} from '../hooks/useCharacters'
import CharacterItem from '../components/CharacterItem'

export default function HomeScreen() {
	const { 
			characters,error,loading,
			name,setName,category,setCategory,
			page,limit,setLimit,handleQuery,
			notHasPrev,notHasNext,match,
			fetchPrevPage,fetchNextPage,refresh
		}=useCharacters()

	return (
		<div align="center">
			{error && <div className="error">error : {error}</div>}

			<div className="head">
				<h1>Bad Characters</h1>
			</div>
			<div className="search-bars">
				<form onSubmit={handleQuery}>
					<input 
						className="search" 
						type="search" 
						placeholder="search by name" 
						value={name} 
						onChange={(e)=>setName(e.target.value)} 
					/>
				</form>
				<form onSubmit={handleQuery}>
					<input 
						className="search" 
						type="search" 
						placeholder="filter by category" 
						value={category} 
						onChange={(e)=>setCategory(e.target.value)} 
					/>
				</form>
				<button onClick={refresh} class="refresh-btn">
					Refresh
				</button>
			</div>
			
			
			<div className="table">
				{loading && <div className="load">
					<div className="donutSpinner"></div>
				</div>}
				<table cellSpacing={0}>
					<thead>
						<tr>
							<th>Char ID</th>
							<th>Name</th>
							<th>Occupation</th>
							<th>Date of Birth</th>
							<th>Status</th>
							<th>Category</th>
						</tr>
					</thead>
					<tbody>
						{characters.map(item=>{
							if(match(item.category,item.name)){
								return <CharacterItem key={item.char_id} data={item} />
							}
							return null
						})}
					</tbody>
				</table>
			</div>
			{ (name || category) && characters.length===0 && 
				<div>
					<div className="no-match">no match found !</div>
				</div>
			}
			<div className="limit-section">
				<label>Limit</label>
				<select value={limit} onChange={(e)=>setLimit(e.target.value)}>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={20}>20</option>
					<option value={30}>30</option>
					<option value={40}>40</option>
					<option value={50}>50</option>
				</select>
			</div>

			<div className="navigation">
				<button className="nav-btn" 
						disabled={notHasPrev()} 
						onClick={fetchPrevPage}>
					prev page
				</button>
				<div className="page-label">page - {page}</div>
				<button className="nav-btn" 
						disabled={notHasNext()} 
						onClick={fetchNextPage}>
					next page
				</button>
			</div>
		</div>
	)
}