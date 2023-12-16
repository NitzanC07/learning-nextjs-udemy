/**
 * * SSR - Server Side Rendering page component. 
 * * With function getServerSideProps to define it.
 */

function UserProfilePage(props) {
    return <h1>{props.userName}</h1>
}

export default UserProfilePage;

export async function getServerSideProps() {
    console.log("Server Side Rendering (SSR)");

    return {
        props: {userName: "Nitzan1"}
    }
}