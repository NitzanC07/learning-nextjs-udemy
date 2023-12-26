import path from "path";
import fs from "fs/promises"; // Using file system to manage read files.
import Link from "next/link";

/**
 * * SSG - Static Site Generation page component.
 * * With the function getStaticProps in definition for this page.
 */

function HomePage(props) {
  const { products } = props;

  return (
    <main>
      <h1>Home Pgae</h1>
    </main>
  );
}

export default HomePage;
