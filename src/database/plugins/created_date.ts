import * as mongoose from 'mongoose';

export const PluginCreatedDate = function (schema: mongoose.Schema<any>) {
  schema.add({
    c_at: { type: Date }, // created_at
  });

  // Document Middleware: Create a pre-save hook
  schema.pre(['save'], function (next) {
    const now = Date();
    this.c_at = now;

    // Call the next function in the pre-save chain
    next();
  });

  // schema.pre(['findOneAndUpdate'], function (next) {
  //   const data: any = this.getUpdate();
  //   if (!data.c_at) {
  //     const now = Date();
  //     data.c_at = now;
  //   }

  //   // Call the next function in the pre-save chain
  //   next();
  // });
};
