type Props = {
  poster_path?: string;
}

const CardImage = ({ poster_path }: Props) => {
  return (
    <>
      <div className="w-80 lg:min-w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-lg" src={poster_path} alt="" />
      </div>
    </>
  )
}

export default CardImage
