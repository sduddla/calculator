export default function App() {
  return (
    <>
      <div className='bg-gray-600 flex items-center justify-center h-screen'>
        <article className='w-[420px] bg-[#fff] rounded-2xl p-5'>
          <div
            className='w-full h-[75px] rounded-sm mt-3 mb-6 overflow-y-auto'
            style={{
              boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.15)',
            }}
          ></div>
          <div className='text-sm text-right px-2 opacity-50 mb-2'>0+0</div>
          <input
            type='text'
            className='text-right text-5xl mb-5 px-2 text-black w-full'
            value='0'
          />

          <form className='grid grid-cols-4 gap-4 auto-rows-[72px]'>
            <input type='button' value='DEL' className='calc-btn calc-gray' />
            <input type='button' value='AC' className='calc-btn calc-gray' />
            <input type='button' value='%' className='calc-btn calc-gray' />
            <input type='button' value='÷' className='calc-btn calc-blue' />

            <input type='button' value='7' className='calc-btn' />
            <input type='button' value='8' className='calc-btn' />
            <input type='button' value='9' className='calc-btn' />
            <input type='button' value='x' className='calc-btn calc-blue' />

            <input type='button' value='4' className='calc-btn' />
            <input type='button' value='5' className='calc-btn' />
            <input type='button' value='6' className='calc-btn' />
            <input type='button' value='-' className='calc-btn calc-blue' />

            <input type='button' value='1' className='calc-btn' />
            <input type='button' value='2' className='calc-btn' />
            <input type='button' value='3' className='calc-btn' />
            <input type='button' value='+' className='calc-btn calc-blue' />

            <input type='button' value='0' className='calc-btn col-span-2' />
            <input type='button' value='.' className='calc-btn' />
            <input type='button' value='=' className='calc-btn calc-blue' />
          </form>
        </article>
      </div>
    </>
  );
}
