function HomePage(props) {

  const { products } = props;

  return (
    <ul>
      <li>Product 1</li>
      <li>Product 2</li>
      <li>Product 3</li>
    </ul>
  )
}

export async function getStaticProps() {
  return {
    props: {
      products: [{id: "p1", title: "Product 1"}]
    }
  }
}

export default HomePage;