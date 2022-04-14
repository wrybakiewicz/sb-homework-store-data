import {create} from "ipfs";
import {useState} from "react";
import all from "it-all"

export default function ReceiveData() {
    const [path, setPath] = useState("")
    const [data, setData] = useState()

    const receiveData = async () => {
        console.log("Receiving data from " + path)
        const node = await create({repo: 'ok' + Math.random()})
        const receivedData = concat(await all(node.cat(path)));
        const decodedData = new TextDecoder().decode(receivedData)
        console.log("Data : " + decodedData)
        setData(decodedData)
    }

    const concat = (arrays) => {
        let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
        if (!arrays.length) return null;
        let result = new Uint8Array(totalLength);
        let length = 0;
        for(let array of arrays) {
            result.set(array, length);
            length += array.length;
        }
        return result;
    }

    return <div>
        <h3>Receive data</h3>
        <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
        />
        <button onClick={receiveData}>Receive data</button>
        {data ?
            <div>
                Your data : {data}
            </div> : <div></div>}
        </div>
}