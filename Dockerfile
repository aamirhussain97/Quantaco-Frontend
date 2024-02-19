# Use Node.js image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 4200 for Angular development server
EXPOSE 4200

# Start the Angular development server using ng serve
CMD ["ng", "serve", "--host", "0.0.0.0"]
