import './App.css';
import { pizzaData } from '../data';

function App() {
  // NEVER DO THIS
  // It will work, but it's bad practice
  // function Pizza() {
  //   return <p>Hello, I am Pizza!</p>;
  // }

  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

// Component has to start with capital letter
// Component has to return JSX
// Component must return only one root element, if there are multiple elements, they must be wrapped in div or <>
function Pizza(props) {
  // Props are READ-ONLY (immutable)
  // If you need to mutate props, use state instead
  // Mutating props means affecting parent component and creating side effects
  const { name, soldOut, ingredients, photoName, price } = props.pizzaObj;

  return (
    <li className={soldOut ? 'pizza sold-out' : 'pizza'}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>I am consists of these ingredients: {ingredients}</p>
        <span>{soldOut ? 'SOLD OUT' : price}</span>
      </div>
    </li>
  );
}

const Menu = function () {
  return (
    <main className="menu">
      <h2>Our pizza menu</h2>

      {/* We can't write statements inside of curly braces in JSX, only expressions are allowed */}
      {pizzaData.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. Six creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name}></Pizza>
            ))}
          </ul>
        </>
      ) : (
        <p>We don&apos;t have any pizza right now. Please try it later!</p>
      )}
    </main>
  );
};

function Header() {
  return (
    <header className="header">
      <h1>Steven&apos;s Pizza Corporation</h1>
    </header>
  );
}

const Footer = () => {
  // return React.createElement(
  //   'footer',
  //   null,
  //   `We are new pizza restaurant, that serves delicious pizzas.`
  // );

  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  console.log(isOpen);

  // We can't conditionaly return nested jsx elements, we have to coppy code like footer element
  // Using ternarnary operator is best option
  // if (!isOpen)
  //   return (
  //     <footer className='footer'>
  //       <p>
  //         We are not open right now. Come between {openHour}:00 and {closeHour}
  //         :00.
  //       </p>
  //     </footer>
  //   );

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          We are not open right now. Come between {openHour}:00 and {closeHour}
          :00.
        </p>
      )}
    </footer>
  );
};

function Order({ closeHour }) {
  return (
    <div className="order">
      <p>We are open. Come and get your delicious pizza until {closeHour}.</p>
      <button className="btn">Order now!</button>
    </div>
  );
}

export default App;
