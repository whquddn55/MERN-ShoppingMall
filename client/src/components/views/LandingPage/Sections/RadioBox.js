import React, {useState} from 'react'
import {Collapse, Radio} from 'antd'

const {Panel} = Collapse;

function RadioBox(props) {
    const [checked, setChecked] = useState(0);

    const handleRadio = (e) => {
        setChecked(e.target.value);

        props.handleFilters(props.list[e.target.value].array);
    }

    const renderRadio = () => (
        <Radio.Group onChange = {handleRadio} value = {checked}>
            {props.list.map((element, index) => (
                <Radio value={element.id} key = {index}>{element.value}</Radio>
            ))}
        </Radio.Group>
    )

    return (
        <div>
            <Collapse>
                <Panel header="Price">
                    {renderRadio()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
