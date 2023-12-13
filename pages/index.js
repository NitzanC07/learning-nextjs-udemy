import path from 'path';
import fs from 'fs/promises'; // Using file system to manage read files.
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <main>
      <ul>
        {
          products.map(product => (
            <li key={product.id}>
              <Link href={`/${product.id}`}>{product.title}</Link>
            </li>
          ))
        }
      </ul>
    </main>
  )
}

export async function getStaticProps() {
  console.log('(Re-)Generation...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); // This gave the absoulte path to data file.
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: { products: data.products },
    revalidate: 15
  }
}

export default HomePage;