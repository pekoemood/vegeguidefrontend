import { useLoaderData } from "react-router";

const VegeDetail = () => {
  const { vegetable } = useLoaderData();
  const { data } = vegetable
  console.log(data);


  return (
    <>
        <h1>hello</h1>
        <h2>{data.attributes.name}</h2>
    </>

  )
}

export default VegeDetail;