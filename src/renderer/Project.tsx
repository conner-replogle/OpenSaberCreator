
import { Button, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import ReactFlow, { removeElements, addEdge, Controls, ReactFlowProvider, Connection, Edge, Elements } from 'react-flow-renderer';
import Sidebar from './SideBar';
import './Project.css';
const initialElements = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Input Node' },
        position: { x: 200, y: 100 },
    },
    {
        id: '2',
        data: { label: 'Another Node' },
        position: { x: 200, y: 200 },
    },
    {
        id: 'edges-1',
        source: '1',
        target: '2',
        animated: true,
        style: { stroke: 'red' },
    },
];
function round(n:number,number_to_round_to:number){
    const quotient = n / number_to_round_to;
    const res = Math.round(quotient) * number_to_round_to;
    return res;
};
let id = 0;
const getId = () => `projectNode_${id++}`;
const snapGrid:[number,number] = [200, 100];
export default function Project(){
    //TODO create prop that will take in the project object and then make the rest of this shit use it
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState(initialElements);
    //@ts-ignore
    const onConnect = (params: Edge<any> | Connection) => setElements((els) => addEdge(params, els));
    //@ts-ignore
    const onElementsRemove = (elementsToRemove: Elements<any>) => setElements((els) => removeElements(elementsToRemove, els));

    const onLoad = (_reactFlowInstance: any) =>
        setReactFlowInstance(_reactFlowInstance);

    const onDragOver = (event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: number; clientY: number; }) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = reactFlowInstance.project({
        x: round(event.clientX - reactFlowBounds.left,snapGrid[0]),
        y: round(event.clientY - reactFlowBounds.top,snapGrid[1]),
        });
        const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
        };

        setElements((es) => es.concat(newNode));
    };

    return (
    <div className="dndflow">
        <ReactFlowProvider>
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                elements={elements}
                onConnect={onConnect}
                onElementsRemove={onElementsRemove}
                elementsSelectable={true}
                onLoad={onLoad}
                onDrop={onDrop}
                onDragOver={onDragOver}
                snapToGrid={true}
                snapGrid={snapGrid}
                >
                <Controls />
                </ReactFlow>
            </div>
            <Sidebar />
        </ReactFlowProvider>
    </div>
    );
}
