import React from 'react'
import { Link } from 'react-router-dom'

export default function CharacterItem({data}) {
	return (
		<tr>
			<td>{data.char_id}</td>
			<td><Link className="link" to={`/character-detail/${data.char_id}`}>{data.name}</Link></td>
			<td className="occupation-td">
				{data.occupation?.join(' || ')}
			</td>
			<td>{data.birthday}</td>
			<td>{data.status}</td>
			<td>{data.category}</td>
		</tr>
	)
}