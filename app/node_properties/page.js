import {getData} from './data'

export default async function node_propertiesPage() {
    const data = await getData()
    console.log(data)
    return (
      <div>
        <h1>Node_properties</h1>
        <ul>
            {data.map(properties => (
                <li key={properties.DevEUI}>
                    {properties.DevAddr}
                </li>
            ))}
        </ul>
      </div>
        
    );
  }
  