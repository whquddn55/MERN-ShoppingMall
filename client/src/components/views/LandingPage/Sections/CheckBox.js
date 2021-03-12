import React, {useState} from 'react'
import {Collapse, Checkbox} from 'antd'

const {Panel} = Collapse;

function CheckBox(props) {
    const [checked, setChecked] = useState([]);

    const handleToggle = (id) => {
        const newChecked = [...checked];
        const index = newChecked.indexOf(id);
        if (index == -1)
            newChecked.push(id);
        else
            newChecked.splice(index, 1);

        setChecked(newChecked);
        props.handleFilters(newChecked);
    }

    const renderCheckBoxList = () =>  props.list.map((element, index) => (
        <Checkbox 
            onChange={() => handleToggle(element.id)} 
            checked = {checked.indexOf(element.id) === -1 ? false : true} 
            key = {index}>{element.value}
        </Checkbox>
    ))

    return (
        <div>
            <Collapse>
                <Panel header="Continents">
                    {renderCheckBoxList()}
                </Panel>
                
            </Collapse>
        </div>
    )
}

export default CheckBox
