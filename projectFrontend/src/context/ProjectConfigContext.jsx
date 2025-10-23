import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadProjectConfigWithCache, applyThemeColors, updateDocumentMetadata } from '../utils/projectConfig';

// Create Context
const ProjectConfigContext = createContext();

// Custom hook to use the context
export const useProjectConfig = () => {
    const context = useContext(ProjectConfigContext);
    if (!context) {
        throw new Error('useProjectConfig must be used within ProjectConfigProvider');
    }
    return context;
};

// Provider Component
export const ProjectConfigProvider = ({ children }) => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async (forceRefresh = false) => {
        try {
            setLoading(true);
            setError(null);

            const projectConfig = await loadProjectConfigWithCache(null, forceRefresh);

            setConfig(projectConfig);

            // Apply theme colors to CSS variables
            if (projectConfig.theme) {
                applyThemeColors(projectConfig.theme);
            }

            // Update document metadata for SEO
            if (projectConfig.metadata) {
                updateDocumentMetadata(projectConfig.metadata);
            }

            setLoading(false);
        } catch (err) {
            console.error('Failed to load project configuration:', err);
            setError(err.message || 'Failed to load project configuration');
            setLoading(false);
        }
    };

    const refreshConfig = () => {
        return loadConfig(true);
    };

    const value = {
        config,
        loading,
        error,
        refreshConfig,
    };

    return (
        <ProjectConfigContext.Provider value={value}>
            {children}
        </ProjectConfigContext.Provider>
    );
};

export default ProjectConfigContext;
