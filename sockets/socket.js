const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand(new Band('Queen'));
bands.addBand(new Band('Abba'));

console.log(bands)

io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());
    client.on('vote-band', data => {
        bands.voteBand(data.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', data => {
        bands.addBand(new Band(data.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', data => {
        bands.deleteBand(data.id);
        console.log(bands);
        io.emit('active-bands', bands.getBands());
    });

    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });

    client.on('mensaje', ( payload ) => {
        console.log(payload);

        io.emit('mensaje', {
            mensaje: 'Hola a todos',
        });
    });

    client.on('emitir-mensaje', (data) => {
        console.log(data)

        // Envia el mensaje a todos los clientes
        io.emit('nuevo-mensaje', data);

        // Envia mensaje a todos menos al que lo emitió
        // client.boadcast.emit();
    });

    
});