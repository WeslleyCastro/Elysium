import Image from "next/image";

export default function Contact() {
  return(
    <section className="">
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-800 p-10 text-white">
        <h1 className="font-semibold text-2xl py-2 drop-shadow-2xl">Entre em contato conosco</h1>
        <p className="text-justify max-w-5xl font-medium leading-7">
          Estamos sempre à disposição para ouvir você. Seja uma pergunta, sugestão, elogio ou até mesmo uma reclamação, estamos aqui para atendê-lo da melhor maneira possível. Sua opinião é importante para nós e estamos ansiosos para receber seu feedback.
        </p>
      </div>

      <div className="flex justify-evenly">
        <form className="mt-20 flex flex-col drop-shadow-sm w-96">
          <label className="label-form" htmlFor="iemail">Email</label>
          <input className="input-form" id="iemail" type="email" placeholder="Digite seu Email"/>
        
          <label className="label-form" htmlFor="text">Assunto</label>
          <textarea className="p-2 border outline-emerald-500 rounded-md" id="text" placeholder="Digite aqui sua duvida" rows={10}/>
          <button className="button mt-4">Enviar</button>
        </form>
        <Image width={400} height={400} src="/images/contactus.svg" alt="imagem de telefone para contato" className="max-lg:hidden"/>
      </div>
    </section>
  )
}