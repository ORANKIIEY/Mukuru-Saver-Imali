package com.moneycoach.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

/**
 * Single Page Application (SPA) Resource Handler.
 * Forwards non-API client routes (e.g. /dashboard, /goals, /coach, /invite)
 * to index.html to ensure client-side routing works reliably on page refresh.
 */
@Configuration
public class SpaWebFilterConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);
                        if (requestedResource.exists() && requestedResource.isReadable()) {
                            return requestedResource;
                        }

                        // Do not route API, OpenAPI/Swagger, or Actuator paths to index.html
                        if (resourcePath.startsWith("api")
                                || resourcePath.startsWith("v3/api-docs")
                                || resourcePath.startsWith("swagger-ui")
                                || resourcePath.startsWith("actuator")) {
                            return null;
                        }

                        // Route SPA client paths back to index.html
                        Resource indexResource = location.createRelative("index.html");
                        if (indexResource.exists() && indexResource.isReadable()) {
                            return indexResource;
                        }

                        return null;
                    }
                });
    }
}
