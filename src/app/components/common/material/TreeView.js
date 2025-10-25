import React from 'react';
import { Box} from '@mui/material';
import { useStyles } from '../../../../assets/styles/styles'
import classNames from 'classnames';

const TreeView = (props) => {
    const Classes = useStyles();

    const commonStructure = (childItem) => {
        return(
            childItem.child && (childItem.child.length > 0) && 
            <ul className={ classNames(Classes.hierarchyList, props.hierarchyList) }>
                {
                    childItem.child.map((singleItem) => (
                        <li className={ classNames(Classes.listItem, props.listItem )}>
                            { singleItem.renderBlock }
                            {
                                singleItem.child && commonStructure(singleItem)
                            }
                        </li>
                    ))
                }
            </ul>
        );
    }

    return(
        <Box>
            { props.structureData.renderBlock }
            { commonStructure(props.structureData) }
        </Box>
    );
}

export default TreeView;