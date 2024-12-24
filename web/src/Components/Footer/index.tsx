export const Footer = () => {
  return (
    <footer className="text-center text-gray-200 bg-blue-600 w-full py-6">
      <p className="text-sm text-white mt-10">
        © {new Date().getFullYear()} SUSLine. Todos os direitos reservados.
      </p>

      <p className="text-sm text-white pb-6">
        Desenvolvido com 💻 e ☕ por{' '}
        <a
          href="https://erivam.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 font-bold"
        >
          José Erivam
        </a>{' '}
        e{' '}
        <a
          href="https://portifoliojsdev.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 font-bold"
        >
          {' '}
          José Erisvaldo.
        </a>
      </p>

      <div className="mt-4">
        <a href="#top" className="text-white hover:underline text-sm mr-4">
          Voltar ao topo
        </a>
        <a href="#" className="text-white hover:underline text-sm mr-4">
          Política de Privacidade
        </a>
        <a href="#" className="text-white hover:underline text-sm">
          Termos de Serviço
        </a>
      </div>
    </footer>
  )
}
