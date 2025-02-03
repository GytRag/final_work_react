import React from 'react';
import CreateComp from "../components/CreateComp";
import useStore from "../store/main";

const RegisterPage = () => {

    const {error} = useStore((state) => state)


    return (
        <div className="text-center">
            <div>
                {error && error}
            </div>
            <div>
                <CreateComp />
            </div>

        </div>
    );
};

export default RegisterPage;