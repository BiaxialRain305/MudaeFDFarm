// config.js
module.exports = {
    // Option 1: Use the category id of the channels you wish to watch over
    // If no category - string should be empty.
    // category_id: ""
    category_id: "Enter_Category_Id",
    
    // Option 2: Add the IDs of the channels you wish to watch over
    // Instead, fill below and create an array or string of channel IDs
    watch_these_channels_Ids: ["Enter_Channel_id1", "Enter_Channel_id2", "Enter_Channel_id3"],

    // ==========================================================
    
    // Channel ID where "$fd character_name" command will send
    FD_Channel_Id: "Enter_forcedivorce_channel_id",

    // Character name to monitor for divorce claims
    // fill below and create an array or string of channel IDs
    Character_Name: ["1st_Char_Name_To_Forcedivorce", "2nd_Char_Name_To_Forcedivorce"]
};
