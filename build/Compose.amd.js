define("Compose", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Composes two or more classes to one.
     * It looses the ability to use YourInstance instanceof YourClass.
     * You can use isComposedWith instead.
     *
     * @param classes
     * @constructor
     */
    function Compose(...classes) {
        // Create a name for the class.
        let composedClassName = classes.map(singleClass => singleClass.prototype.constructor.name).join('');
        /**
         * This is the class name we will use.
         */
        class NewClass {
            /**
             * constructor, you can feed it an object keyed by the class names of the composed class.
             * @param composedData
             */
            constructor(composedData) {
                // For each class we copy the properties and the methods.
                Object.keys(this.prototypes).forEach(className => {
                    // Create an instance of the class.
                    const classInstance = new this.prototypes[className](composedData && composedData[className] ? composedData[className] : null);
                    // Copy all the things from the instance to our class.
                    Object.defineProperties(this, Object.getOwnPropertyDescriptors(classInstance));
                });
            }
            /**
             * instanceof replacement.
             * @param className
             */
            isComposedWith(className) {
                return Object.keys(this.prototypes).includes(className);
            }
        }
        NewClass.prototype.prototypes = {};
        /**
         * Traverses the prototype chain and copies all properties and methods onto our class.
         * @param prototype
         */
        const copyProperties = (prototype) => {
            let prototypes = [];
            // For every prototype.
            while (prototype) {
                prototypes.push(prototype);
                // Process the next prototype.
                prototype = Object.getPrototypeOf(prototype);
            }
            // Reverse the chain so the newest methods overwrite the oldest.
            prototypes.reverse();
            prototypes.forEach(prototype => {
                const { constructor, ...propertyDescriptors } = Object.getOwnPropertyDescriptors(prototype);
                Object.defineProperties(NewClass.prototype, propertyDescriptors);
            });
        };
        // Place all the prototypes in the class for reference.
        for (const singleClass of classes) {
            copyProperties(singleClass.prototype);
            NewClass.prototype.prototypes[singleClass.prototype.constructor.name] = singleClass;
        }
        // Set the class name to a combined name of all given classes.
        Object.defineProperty(NewClass.constructor, 'name', { value: composedClassName });
        return NewClass;
    }
    exports.Compose = Compose;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9Vc2Vycy9kLmJlZWtlL0RldmVsb3BtZW50L2NvbXBvc2Uvc3JjL0NvbXBvc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7Ozs7Ozs7T0FPRztJQUNILFNBQWdCLE9BQU8sQ0FBQyxHQUFHLE9BQWM7UUFDdkMsK0JBQStCO1FBQy9CLElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVwRzs7V0FFRztRQUNILE1BQU0sUUFBUTtZQUdaOzs7ZUFHRztZQUNILFlBQVksWUFBWTtnQkFDdEIseURBQXlEO2dCQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQy9DLG1DQUFtQztvQkFDbkMsTUFBTSxhQUFhLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksSUFBSSxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRS9ILHNEQUFzRDtvQkFDdEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMseUJBQXlCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDakYsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQ7OztlQUdHO1lBQ0gsY0FBYyxDQUFDLFNBQVM7Z0JBQ3RCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFELENBQUM7U0FDRjtRQUVELFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVuQzs7O1dBR0c7UUFDSCxNQUFNLGNBQWMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ25DLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUVwQix1QkFBdUI7WUFDdkIsT0FBTyxTQUFTLEVBQUU7Z0JBQ2hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRTNCLDhCQUE4QjtnQkFDOUIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDOUM7WUFFRCxnRUFBZ0U7WUFDaEUsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXJCLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzdCLE1BQU0sRUFBQyxXQUFXLEVBQUUsR0FBRyxtQkFBbUIsRUFBQyxHQUFHLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDMUYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQztRQUVGLHVEQUF1RDtRQUN2RCxLQUFLLE1BQU0sV0FBVyxJQUFJLE9BQU8sRUFBRTtZQUNqQyxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQztTQUNyRjtRQUVELDhEQUE4RDtRQUM5RCxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLGlCQUFpQixFQUFDLENBQUMsQ0FBQztRQUVoRixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBdEVELDBCQXNFQyJ9