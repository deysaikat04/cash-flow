import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {
    return (
        <Typography variant="body1" gutterBottom style={{ fontWeight: 600 }}>
            {props.children}
        </Typography>
    );
}

Title.propTypes = {
    children: PropTypes.node,
};