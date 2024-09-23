#!/bin/bash

# Check if both module name and class name are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <module_name_snake_case> <ClassName>"
    exit 1
fi

# Set the module name and class name
MODULE_NAME=$1
CLASS_NAME=$2
SNAKE_CASE=$MODULE_NAME
CAMEL_CASE=$CLASS_NAME


# Set the base directory
BASE_DIR="src/modules/$MODULE_NAME"

# Create the directory structure
mkdir -p $BASE_DIR/v1
mkdir -p $BASE_DIR/schemas

# Create the schema file
cat > $BASE_DIR/schemas/${SNAKE_CASE}.schema.ts << EOL
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ${CLASS_NAME}Document = ${CLASS_NAME} & Document;

@Schema({
    timestamps: {
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
    },
})
export class ${CLASS_NAME} extends Document {
    // Add your schema properties here
}

const ${CLASS_NAME}Schema = SchemaFactory.createForClass(${CLASS_NAME});
export { ${CLASS_NAME}Schema };
EOL

# Create the service file
cat > $BASE_DIR/v1/${SNAKE_CASE}.service.ts << EOL
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ${CLASS_NAME}, ${CLASS_NAME}Document } from '../schemas/${SNAKE_CASE}.schema';

@Injectable()
export class ${CLASS_NAME}Service {
    constructor(
        @InjectModel(${CLASS_NAME}.name)
        private ${CAMEL_CASE}Model: Model<${CLASS_NAME}Document>,
        private readonly configService: ConfigService,
        @InjectConnection() private readonly connection: mongoose.Connection,
    ) {}

    // Add your service methods here
}
EOL

# Create the controller file
cat > $BASE_DIR/v1/${SNAKE_CASE}.controller.ts << EOL
import { Controller } from '@nestjs/common';
import { ${CLASS_NAME}Service } from './${SNAKE_CASE}.service';

@Controller({
    version: '1',
    path: '${MODULE_NAME}',
})
export class ${CLASS_NAME}Controller {
    constructor(private readonly ${CAMEL_CASE}Service: ${CLASS_NAME}Service) {}

    // Add your controller methods here
}
EOL

# Create the module file
cat > $BASE_DIR/v1/${SNAKE_CASE}.module.ts << EOL
import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/gurads/jwt/jwt.strategy';
import { ${CLASS_NAME}, ${CLASS_NAME}Schema } from '../schemas/${SNAKE_CASE}.schema';
import { ${CLASS_NAME}Controller } from './${SNAKE_CASE}.controller';
import { ${CLASS_NAME}Service } from './${SNAKE_CASE}.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ${CLASS_NAME}.name,
                schema: ${CLASS_NAME}Schema,
            }
        ]),
        PassportModule,
        JwtModule,
    ],
    controllers: [${CLASS_NAME}Controller],
    providers: [${CLASS_NAME}Service, Logger, JwtStrategy],
    exports: [${CLASS_NAME}Service],
})
export class ${CLASS_NAME}Module { }
EOL

# Create the DTO file
cat > $BASE_DIR/v1/dto/${SNAKE_CASE}.dto.ts << EOL
// Add your DTOs here
EOL

echo "Module $MODULE_NAME with class $CLASS_NAME has been created successfully in $PARENT_DIR."