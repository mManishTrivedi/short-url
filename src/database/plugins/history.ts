// import * as mongoose from 'mongoose';

// export const PluginHistory = function (
//   schema: mongoose.Schema<any>,
//   options = { fieldName: null },
// ) {
//   const fieldStructure = {
//     value: '',
//     ts: '',
//     history: []

//   }
//   schema.add({

//     c_at: { type: Date }, // created_at
//   });

//   // Document Middleware: Create a pre-save hook
//   schema.pre(['save'], function (next) {
//     const now = Date();
//     this.c_at = now;

//     // Call the next function in the pre-save chain
//     next();
//   });
// };
