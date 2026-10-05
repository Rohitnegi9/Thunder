function App(){
   
    return(
        <>
        <h1 className="bg-red-200 text-gray-950">Hello Coder Army</h1>
        <div className="bg-blue-800 p-10 w-xs m-auto font-sans  text-gray-100 text-center" >Rohit Negi zindabad</div>

        <div className="flex justify-center gap-2 flex-row-reverse mt-10">
            <div className="w-14 bg-amber-500">First</div>
            <div className="w-24 bg-red-500">Second</div>
            <div className="w-10 bg-orange-300">Third</div>
            <div className="w-18 bg-purple-500">Fourth</div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-10 bg-amber-200">
            <div className="p-2 border border-red-300">First</div>
            <div className="p-2 border border-red-300">Second</div>
            <div className="p-2 border border-red-300">Third</div>
            <div className="p-2 border border-red-300">First</div>
            <div className="p-2 border border-red-300">Second</div>
            <div className="p-2 border border-red-300">Third</div>
        </div>
        </>
    )
}

export default App;