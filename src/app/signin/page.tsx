import Image from 'next/image';
import logo from '../../assets/Logo.png';
import zelda from '../../assets/zelda.jpg';
import Link from 'next/link';
import TextInput from '@/components/text-input';

export default function SignIn(){
    return (
    <main className='flex max-h-screen'>
        <div className='flex flex-col w-3/4 overflow-hidden'>
            <Image src={logo} className='w-2/5 self-center' alt='Logo' />
            <h1 className='self-center text-2xl'>Jogue, registre e compartilhe</h1>
            <div className='relative'>
                <Image src={zelda} alt='Zelda'/>
                <div className='absolute inset-0 bg-gradient-radial from-transparent to-black'></div>
                <div className='absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black'></div>
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black'></div>
            </div>
        </div>
        <div className='flex flex-col w-1/4 p-10 bg-slate-900 justify-center'>
            <h1 className='self-center text-2xl'>Faça seu login</h1>
            <form className='flex flex-col gap-8'>
            <div className='flex flex-col'>
                <label className='text-white'>Email</label>
                <TextInput type='email' placeholder='Digite seu email' />
            </div>
            <div className='flex flex-col'>
                <label className='text-white'>Senha</label>
                <TextInput type='password' placeholder='Digite sua senha' />
            </div>
            <button className='bg-orange-700 text-white p-2 rounded-lg mt-5'>Entrar</button>
            </form>
            <h1 className='self-center text-slate-500 text-xl mt-10'> Ou use suas outras redes sociais </h1>
            <div className='self-center flex flex-row space-x-5'>
                <button className='bg-orange-700 text-white p-2 rounded-lg mt-5'>Steam</button>
                <button className='bg-orange-700 text-white p-2 rounded-lg mt-5'>Google</button>
            </div>
            <h2 className='self-center text-white mt-10'>Não tem uma conta? <Link href='#' className='text-blue-500'>Cadastre-se</Link></h2>
        </div>
    </main>
    )
}