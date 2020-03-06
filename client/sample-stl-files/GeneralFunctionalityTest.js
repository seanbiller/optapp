import { Selector } from 'testcafe';

fixture `New Fixture`
    .page `https://opt-industries.herokuapp.com/`;

test('New Test', async t => {
    await t
        .drag(Selector('#time'), -54, -3, {
            offsetX: 7,
            offsetY: 11
        })
        .click(Selector('label').withText('Choose .stl file'))
        .setFilesToUpload(Selector('#uploadInput'), ['../client/sample-stl-files/GeneralFunctionalityTest.js'])
        .click(Selector('label').withText('On').find('[name="rotate_option"]'))
        .click(Selector('label').withText('Show').find('[name="bbox_option"]'))
        .click(Selector('label').withText('Show').nth(1).find('[name="axes_option"]'))
        .click(Selector('#red_color'))
        .click(Selector('#darkblue_color'))
        .click(Selector('#resin'))
        .click(Selector('option').withText('$345.99/Liter Zortrax Raydent Surgical Guide Resin'))
        .click(Selector('#resin'))
        .click(Selector('option').withText('$142.99/Liter BlueCast x5 Resin'))
        .click(Selector('#resin'))
        .click(Selector('option').withText('$138.69/Liter BlueCast Original DLP Resin - Blue'))
        .click(Selector('#resin'))
        .click(Selector('option').withText('$76.90/Liter Photocentric3D UV DLP Firm Resin - Gr'))
        .click(Selector('#resin'))
        .click(Selector('option').withText('$69.98/Liter PrimaCreator Value UV/DLP Resin - Tra'))
        .click(Selector('#resin'))
        .click(Selector('option').withText('$59.90/Liter PrimaCreator Value UV/DLP Resin - Lig'))
        .drag(Selector('#time'), -68, 14, {
            offsetX: 7,
            offsetY: 6
        })
        .click(Selector('#cpal'))
        .click(Selector('#brown_color'))
        .click(Selector('label').withText('Off').find('[name="rotate_option"]'))
        .click(Selector('label').withText('Off').find('[name="rotate_option"]'))
        .click(Selector('label').withText('On').find('[name="rotate_option"]'))
        .click(Selector('label').withText('Hide').find('[name="bbox_option"]'))
        .drag(Selector('#model').find('canvas'), 191, -7, {
            offsetX: 190,
            offsetY: 251
        })
        .drag(Selector('#model').find('canvas'), 168, -31, {
            offsetX: 285,
            offsetY: 230
        })
        .drag(Selector('#model').find('canvas'), 16, 52, {
            offsetX: 312,
            offsetY: 228
        })
        .click(Selector('label').withText('Off').find('[name="rotate_option"]'))
        .drag(Selector('#model').find('canvas'), 201, -2, {
            offsetX: 206,
            offsetY: 251
        })
        .click(Selector('label').withText('On').find('[name="rotate_option"]'))
        .click(Selector('label').withText('Show').find('[name="bbox_option"]'))
        .click(Selector('label').withText('Hide').nth(1).find('[name="axes_option"]'))
        .click(Selector('label').withText('Hide').nth(1).find('[name="axes_option"]'))
        .click(Selector('label').withText('Show').nth(1).find('[name="axes_option"]'))
        .click(Selector('span').withText('Export to PDF'))
        .click(Selector('span').withText('Export to PDF'));
});