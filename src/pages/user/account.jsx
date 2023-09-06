import {useSelector} from "react-redux";
import {ButtonGroup, LinkButton} from "../../components/buttons";
import {user_accounts_edit_url, user_accounts_reset_password_url} from "../../helpers/strings";

const Account = () => {
    const state = useSelector(state => state)
    return (
        <>
            <div className="py-12">
                <table className="table-auto">
                    <tbody>
                    <tr>
                        <td className={"py-2 px-4"}>First Name</td>
                        <td className={"capitalize"}>{state.auth.user_data.first_name}</td>
                    </tr>
                    <tr>
                        <td className={"py-2 px-4"}>Last Name</td>
                        <td className={"capitalize"}>{state.auth.user_data.last_name}</td>
                    </tr>
                    <tr>
                        <td className={"py-2 px-4"}>Email Address</td>
                        <td className={""}>{state.auth.user_data.email}</td>
                    </tr>
                    <tr>
                        <td className={"py-2 px-4"}>Phone Number</td>
                        <td className={"capitalize"}>{state.auth.user_data.phone_number}</td>
                    </tr>
                    <tr>
                        <td className={"py-2 px-4"}>Referral Code</td>
                        <td className={"capitalize"}>{state.auth.user_data.referral_code || "Coming Soon!"}</td>
                    </tr>
                    </tbody>
                </table>

                <ButtonGroup className={"mt-8 mx-auto"}>
                    <LinkButton size={"md"} bg={"#000"} location={user_accounts_edit_url} text={"Edit Profile"}/>
                    <LinkButton size={"md"} bg={"#000"} location={user_accounts_reset_password_url} text={"Reset Password"}/>
                </ButtonGroup>
            </div>
        </>
    )
}

export default Account