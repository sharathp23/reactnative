import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showNotes, setShowNotes] = useState(false);
  const [note, setNote] = useState('');
  const [noteTopic, setNoteTopic] = useState('');
  const [noteItems, setNoteItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (isEditing) {
      const updatedTasks = [...taskItems];
      updatedTasks[editIndex] = { ...updatedTasks[editIndex], text: task };
      setTaskItems(updatedTasks);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setTaskItems([...taskItems, { text: task, completed: false }]);
    }
    setTask('');
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].completed = !itemsCopy[index].completed;
    setTaskItems(itemsCopy);
  };

  const editTask = (index) => {
    setTask(taskItems[index].text);
    setIsEditing(true);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const handleAddNote = () => {
    Keyboard.dismiss();
    setNoteItems([...noteItems, { topic: noteTopic, text: note }]);
    setNote('');
    setNoteTopic('');
  };

  const editNote = (index) => {
    setNoteTopic(noteItems[index].topic);
    setNote(noteItems[index].text);
    setShowNotes(true); // Show notes screen
    setEditIndex(index);
  };

  const deleteNote = (index) => {
    let itemsCopy = [...noteItems];
    itemsCopy.splice(index, 1);
    setNoteItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 120, // Ensure there's enough space for the input section
        }}
        keyboardShouldPersistTaps="handled"
      >
        {showNotes ? (
          <View style={styles.notesContainer}>
            <TextInput
              style={styles.noteInput}
              placeholder="Topic"
              value={noteTopic}
              onChangeText={(text) => setNoteTopic(text)}
            />
            <TextInput
              style={[styles.noteInput, styles.noteTextInput]}
              placeholder="Write a note"
              value={note}
              onChangeText={(text) => setNote(text)}
              multiline={true}
            />
            <TouchableOpacity onPress={handleAddNote}>
              <View style={styles.addNoteWrapper}>
                <Text style={styles.addText}>Add Note</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.noteList}>
              {noteItems.map((item, index) => (
                <View key={index} style={styles.noteItem}>
                  <TouchableOpacity onPress={() => editNote(index)}>
                    <View style={styles.noteBox}>
                      <Text style={styles.noteTopic}>{item.topic}</Text>
                      <Text style={styles.noteText}>{item.text}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteNote(index)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.tasksContainer}>
            <View style={styles.tasksWrapper}>
              <Text style={styles.sectionTitle}>Today's tasks</Text>
              <View style={styles.items}>
                {taskItems.map((item, index) => (
                  <View key={index} style={styles.taskContainer}>
                    <TouchableOpacity onPress={() => completeTask(index)}>
                      <Text style={item.completed ? styles.taskCompleted : styles.task}>{item.text}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => editTask(index)}>
                      <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteTask(index)}>
                      <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
              <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={(text) => setTask(text)} />
              <TouchableOpacity onPress={handleAddTask}>
                <View style={styles.addWrapper}>
                  <Text style={styles.addText}>{isEditing ? 'Edit' : '+'}</Text>
                </View>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setShowNotes(false)}>
          <Text style={[styles.footerText, !showNotes && styles.active]}>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowNotes(true)}>
          <Text style={[styles.footerText, showNotes && styles.active]}>Notes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksContainer: {
    flex: 1,
  },
  notesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  items: {
    marginTop: 30,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  task: {
    fontSize: 18,
  },
  taskCompleted: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  editText: {
    color: 'blue',
    marginRight: 10,
  },
  deleteText: {
    color: 'red',
  },
  writeTaskWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1
,
    marginRight: 20,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderTopColor: '#C0C0C0',
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 18,
    color: '#C0C0C0',
  },
  active: {
    fontWeight: 'bold',
    color: '#000',
  },
  noteInput: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: 10,
  },
  noteTextInput: {
    height: 150,
  },
  addNoteWrapper: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  noteList: {
    marginTop: 20,
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  noteBox: {
    flex: 1,
  },
  noteTopic: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteText: {},
});
