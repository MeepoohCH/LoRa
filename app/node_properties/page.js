import {getDataProperties} from './data'

export default async function PropertiesPage() {
    const data = await getDataProperties()
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
  