import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

function Ratings({ value, text, color }) {
	return (
		<div className="rating">
			<span>
				<FontAwesomeIcon
					icon={value >= 1 ? faStar : value >= 0.5 ? faStarHalfAlt : faStarEmpty}
					style={{ color: color }}
				/>
				<FontAwesomeIcon
					icon={value >= 2 ? faStar : value >= 1.5 ? faStarHalfAlt : faStarEmpty}
					style={{ color: color }}
				/>
				<FontAwesomeIcon
					icon={value >= 3 ? faStar : value >= 2.5 ? faStarHalfAlt : faStarEmpty}
					style={{ color: color }}
				/>
				<FontAwesomeIcon
					icon={value >= 4 ? faStar : value >= 3.5 ? faStarHalfAlt : faStarEmpty}
					style={{ color: color }}
				/>
				<FontAwesomeIcon
					icon={value >= 5 ? faStar : value >= 4.5 ? faStarHalfAlt : faStarEmpty}
					style={{ color: color }}
				/>
			</span>
			<span>{text && text}</span>
		</div>
	);
}

Ratings.defaultProps = {
	color: '#f8ce0b',
};

Ratings.prototype = {
	value: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	color: PropTypes.string,
};

export default Ratings;
