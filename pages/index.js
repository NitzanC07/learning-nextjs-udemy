function HomePage(props) {
  const { products } = props;

  return (
    <main>
      <ul>
        {
          products.map(product => (
            <li key={product.id}>{product.title}</li>
          ))
        }
      </ul>
    </main>
  )
}

export async function getStaticProps() {
  return {
    props: {
      products: [{id: 'p1', title: 'Product 1'}]
    }
  }
}

export default HomePage;