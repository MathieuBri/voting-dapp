import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const LoadingButton = ({ action, parameters, disableState, ...props }) =>
{
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() =>
    {
        if (isLoading)
        {
            action(parameters).then(() =>
            {
                setLoading(false);
            })
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
        <Button
            {...props}
            disabled={isLoading || disableState}
            onClick={!isLoading ? handleClick : null}
        >
            {isLoading ? (
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true" />
            ) : props.children}
        </Button>
    );
}

export default LoadingButton