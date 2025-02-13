import { fetchAction } from './actions/authActions';

const page = async () => {
  const result = await fetchAction();
  const data = await result.data;
  return (
    <div className='text-white p-5'>
      <h1 className='text-4xl text-white font-bold'>Name: {data.name}</h1>
      <p className='text-sm'>Email: {data.email}</p>
    </div>
  );
}

export default page;
