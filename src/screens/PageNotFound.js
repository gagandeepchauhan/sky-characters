import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import PNF from '../svgs/page_not_found.svg'

export default function PageNotFound() {
	const history=useHistory()
	function goBack(){
		history.goBack()
	}
	return (
		<div className="page-not-found" align="center">
			<div className="">
			  <img className="pnf-illustration" src={PNF} alt='pnf svg' />
			  <h1 className="">Page Not Found</h1>
			  <p className="">
			  	<button className="back-btn" onClick={goBack}>Back</button>
			  </p>
			</div>
		</div>
	)
}