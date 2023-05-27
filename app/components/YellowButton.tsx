export default function YellowButton (props) {
  return (
    <button className="bg-yellow-300 rounded-md text-black font-bold px-5 h-10 m-4 hover:bg-yellow-200 transition" {...props}>{props.content}</button>
  )
}