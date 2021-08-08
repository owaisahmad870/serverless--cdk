"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = async (event) => {
    const notesArray = ["note1", "note2", "note3"];
    switch (event.info.fieldName) {
        case "notes":
            return notesArray;
        case "customNote":
            return event.arguments.title;
        default:
            return 'Welcome from Appsync lambda';
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWNBLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQW1CLEVBQUUsRUFBRTtJQUM5QyxNQUFNLFVBQVUsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFL0MsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUM1QixLQUFLLE9BQU87WUFDVixPQUFPLFVBQVUsQ0FBQztRQUNwQixLQUFLLFlBQVk7WUFDZixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQy9CO1lBQ0UsT0FBTyw2QkFBNkIsQ0FBQztLQUN4QztBQUVILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcCB9IGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XHJcbmltcG9ydCB7IGluZGV4ZWRBY2Nlc3NUeXBlIH0gZnJvbSBcIkBiYWJlbC90eXBlc1wiO1xyXG5cclxuXHJcblxyXG50eXBlIEFwcFN5bmNFdmVudCA9IHtcclxuICBpbmZvOiB7XHJcbiAgICBmaWVsZE5hbWU6IHN0cmluZztcclxuICB9O1xyXG4gIGFyZ3VtZW50czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBBcHBTeW5jRXZlbnQpID0+IHtcclxuICBjb25zdCBub3Rlc0FycmF5ID0gW1wibm90ZTFcIiwgXCJub3RlMlwiLCBcIm5vdGUzXCJdO1xyXG5cclxuICBzd2l0Y2ggKGV2ZW50LmluZm8uZmllbGROYW1lKSB7XHJcbiAgICBjYXNlIFwibm90ZXNcIjpcclxuICAgICAgcmV0dXJuIG5vdGVzQXJyYXk7XHJcbiAgICBjYXNlIFwiY3VzdG9tTm90ZVwiOlxyXG4gICAgICByZXR1cm4gZXZlbnQuYXJndW1lbnRzLnRpdGxlO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuICdXZWxjb21lIGZyb20gQXBwc3luYyBsYW1iZGEnO1xyXG4gIH1cclxuXHJcbn07XHJcbiJdfQ==