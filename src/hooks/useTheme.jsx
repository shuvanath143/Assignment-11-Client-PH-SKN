import React, { use } from 'react';
import { ThemeContext } from '../context/ThemeContext/ThemeContext';

const useTheme = () => {
    const themeInfo = use(ThemeContext);
    return themeInfo;
};

export default useTheme;