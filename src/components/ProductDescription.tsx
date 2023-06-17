const ProductDescription = () => {
    const text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    return (
        <div className="container pt-[30px] text-gray-700">
            <h4 className="mb-[10px] font-medium text-gray-500 text-base">Description</h4>
            <div className="leading-[24px]">{text}</div>
        </div>
    );
};

export default ProductDescription;
