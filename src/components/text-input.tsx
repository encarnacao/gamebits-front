export default function TextInput({type, placeholder}:{type:string, placeholder:string}){
    return (
        <input className='bg-slate-800 outline-none text-white p-2 rounded-none border-b border-orange-400 placeholder-slate-600' type={type} placeholder={placeholder} />
    )
}