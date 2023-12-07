import path from 'path';
import fs from 'fs/promises'; // Using file system to manage read files.

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
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); // This gave the absoulte path to data file.
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products
    }
  }
}

export default HomePage;