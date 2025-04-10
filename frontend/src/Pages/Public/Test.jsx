
// import { createRoot } from 'react-dom/client';

// eslint-disable-next-line react/prop-types
const List = ({ A, B, C }) => {
  // Yоur cоdе gоеs hеrе
//   const [ index, setIndex ] = useState(0);
  const arr = [{id: 0, name: A}, {id:1, name:B}, {id:2, name: C}];
  <ul>
    {arr.map((item, id) => {
        return (
            <li key={id} onClick={item.id !== 0 ? id===0 : id===0}>item.name</li>
        )
    })}
  </ul>;
  return null;
};

// document.body.innerHTML = "<div id='root'></div>";
// const root = createRoot(document.getElementById("root"));

// root.render(<Rating />)
// setTimeout(() => {
//   document.querySelectorAll("span")[2]?.click();
//   setTimeout(() => {
//     console.log(document.getElementById("rating")?.outerHTML);
//   }, 100)
// }, 100);

export default List;
