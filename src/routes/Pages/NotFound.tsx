import React from 'react';
import styled from 'styled-components'

const NotFoundContainer = styled.div`
	width:100vw;
	height:100vh;
	position:absolute;
	background:#F0F0F7;
	top:0; left:0;
	z-index:9999;
	img{
		max-width:50%;
		position: relative;
		top:45%;left:50%;
		transform:translate(-50%, -50%);
	}
`

const NotFound = () => {
	return(
		<>
			<NotFoundContainer>
				<h3>Page introuvable</h3>
			</NotFoundContainer>
		</>
	)
}


export default NotFound;
