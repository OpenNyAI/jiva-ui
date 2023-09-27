import React, {type FC} from 'react';
type LinkIconProperties = {
	color: string;
	style?: {
		marginLeft: number;
	};
};
const LinkIcon: FC<LinkIconProperties> = ({color, style, ...props}) => (
	<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 20 20' fill='none' style={style}>
		<path d='M8.33333 5V6.66667H4.16667V15.8333H13.3333V11.6667H15V16.6667C15 17.1269 14.6269 17.5 14.1667 17.5H3.33333C2.8731 17.5 2.5 17.1269 2.5 16.6667V5.83333C2.5 5.3731 2.8731 5 3.33333 5H8.33333ZM17.5 2.5V9.16667H15.8333L15.8333 5.34417L9.33925 11.8392L8.16074 10.6607L14.6541 4.16667H10.8333V2.5H17.5Z'
			fill={color}/>
	</svg>
);

export default LinkIcon;
