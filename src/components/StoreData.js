import {useState} from "react";
import {create} from "ipfs";

export default function StoreData() {
    const [data, setData] = useState("");
    const [dataLink, setDataLink] = useState();

    const storeData = async () => {
        console.log("Storing data " + data)
        const node = await create()
        const cid = await node.add(data)
        console.log("Data stored on: " + cid.path)
        setDataLink(cid.path)
    }

    return <div>
        <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
        />
        <button onClick={storeData}>Store</button>
        {dataLink ?
            <div>
                Your data link: {dataLink}
            </div> : <div></div>}
    </div>
}