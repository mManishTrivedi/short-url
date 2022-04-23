import * as mongoose from 'mongoose';

export const PluginUpdatedDate = function (schema: mongoose.Schema<any>) {
  schema.add({
    u_at: { type: Date }, // updated_at
  });

  // Document Middleware: Create a pre-save hook
  schema.pre(['save'], function (next) {
    const now = Date();
    this.u_at = now;

    // Call the next function in the pre-save chain
    next();
  });

  //@ref: https://github.com/Automattic/mongoose/issues/4575
  // Query Middleware
  schema.pre(
    ['updateOne', 'update', 'findOneAndUpdate'],
    async function (next) {
      try {
        const data: any = this.getUpdate();
        data.u_at = Date();
        // this.update({}, data); //.exec();
        return next();
      } catch (error) {
        return next(error);
      }
    },
  );
};
