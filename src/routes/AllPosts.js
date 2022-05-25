import NavbarComponent from "../components/NavbarComponent"
import Posts from "../components/Posts"
import { Fade } from "react-bootstrap"
import NotAuthenticated from "../components/NotAuthenticated"

export default function AllPosts({URL_LIST, isLogged, userToken}){
    return(
        isLogged ?
        <>
            <NavbarComponent isLogged={isLogged}/>
            <div className="maindiv">
                <div style={{   
                                margin: "0 auto", 
                                padding: "50px 0 0 0",
                            }}>
                    <Posts 
                        URL_LIST={URL_LIST}
                        userToken={userToken}
                    />
                </div>
            </div>
        </> :
        <>
            <NavbarComponent isLogged={isLogged}/>
            <Fade appear={true} in={true}>
            <div className="maindiv">
                <div style={{   
                                margin: "0 auto", 
                                padding: "50px 0 0 0",
                            }}>
                    <NotAuthenticated />
                </div>
            </div>
            </Fade>
        </>
    )
}