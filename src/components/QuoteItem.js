import React from 'react'

export default function QuoteItem({data}) {
	return (
		<div className="quote">
			{data.quote}
		</div>
	)
}